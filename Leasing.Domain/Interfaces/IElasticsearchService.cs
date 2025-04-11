using System.Threading.Tasks;

namespace Leasing.Domain.Interfaces
{
    public interface IElasticsearchService
    {
        Task IndexDocumentAsync<T>(T document, string indexName) where T : class;
        Task UpdateDocumentAsync<T>(int id, T document, string indexName) where T : class;
        Task DeleteDocumentAsync<T>(int id, string indexName) where T : class;
    }
}