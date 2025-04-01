using Leasing.Domain.Entities;
using System.Threading.Tasks;

namespace Leasing.Domain.Interfaces
{
    public interface IImageRepository
    {
        Task<Image> GetImageByIdAsync(int id);
        Task AddImageAsync(Image image);
        Task DeleteImageAsync(int id);
    }
}