using ClosedXML.Excel;
using Leasing.Application.Interfaces;
using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Leasing.Application.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _locationRepository;

        public LocationService(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository ?? throw new ArgumentNullException(nameof(locationRepository));
        }

        public async Task<(bool Success, string Message, byte[] FileContent)> ExportLocationsToExcelAsync()
        {
            try
            {
                var locations = await _locationRepository.GetAllLocationsAsync();

                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Locations");
                    worksheet.Cell(1, 1).Value = "State";
                    worksheet.Cell(1, 2).Value = "District";
                    worksheet.Cell(1, 3).Value = "Pincode";

                    for (int i = 0; i < locations.Count; i++)
                    {
                        worksheet.Cell(i + 2, 1).Value = locations[i].State;
                        worksheet.Cell(i + 2, 2).Value = locations[i].District;
                        worksheet.Cell(i + 2, 3).Value = locations[i].Pincode;
                    }

                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        return (true, "Exported successfully", stream.ToArray());
                    }
                }
            }
            catch (Exception ex)
            {
                return (false, $"Error exporting locations: {ex.Message}", null);
            }
        }

        public async Task<(bool Success, string Message)> ImportLocationsFromExcelAsync(byte[] fileContent)
        {
            try
            {
                using (var stream = new MemoryStream(fileContent))
                using (var workbook = new XLWorkbook(stream))
                {
                    var worksheet = workbook.Worksheet(1);
                    if (worksheet == null)
                    {
                        return (false, "Excel file is empty or invalid");
                    }

                    // Validate headers
                    if (worksheet.Cell(1, 1).GetString() != "State" ||
                        worksheet.Cell(1, 2).GetString() != "District" ||
                        worksheet.Cell(1, 3).GetString() != "Pincode")
                    {
                        return (false, "Invalid Excel format. Expected headers: State, District, Pincode");
                    }

                    var rowCount = worksheet.RowsUsed().Count();
                    if (rowCount <= 1)
                    {
                        return (false, "No data found in the Excel file");
                    }

                    for (int row = 2; row <= rowCount; row++)
                    {
                        var state = worksheet.Cell(row, 1).GetString();
                        var district = worksheet.Cell(row, 2).GetString();
                        var pincode = worksheet.Cell(row, 3).GetString();

                        // Validate pincode (basic validation: 6 digits)
                        if (string.IsNullOrWhiteSpace(pincode) || pincode.Length != 6 || !int.TryParse(pincode, out _))
                        {
                            return (false, $"Invalid pincode at row {row}: {pincode}. Pincode must be a 6-digit number.");
                        }

                        if (string.IsNullOrWhiteSpace(state) || string.IsNullOrWhiteSpace(district))
                        {
                            return (false, $"State or District is empty at row {row}");
                        }

                        var existingLocation = await _locationRepository.GetLocationByPincodeAsync(pincode);
                        if (existingLocation != null)
                        {
                            // Update existing location
                            existingLocation.State = state;
                            existingLocation.District = district;
                            await _locationRepository.UpdateLocationAsync(existingLocation);
                        }
                        else
                        {
                            // Add new location
                            var newLocation = new Location
                            {
                                State = state,
                                District = district,
                                Pincode = pincode
                            };
                            await _locationRepository.AddLocationAsync(newLocation);
                        }
                    }

                    return (true, "Locations imported successfully");
                }
            }
            catch (Exception ex)
            {
                return (false, $"Error importing locations: {ex.Message}");
            }
        }
    }
}