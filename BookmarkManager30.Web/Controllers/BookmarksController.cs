using BookmarkManager30.Data;
using BookmarkManager30.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookmarkManager30.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private string _connString;

        public BookmarksController(IConfiguration config)
        {
            _connString = config.GetConnectionString("ConStr");
        }

        [Route("add")]
        [HttpPost]
        [Authorize]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BookmarksRepository(_connString);
            bookmark.UserId = repo.GetUser(User.Identity.Name).Id;
            repo.AddBookmark(bookmark);
        }

        [Authorize]
        [Route("getall")]
        public List<Bookmark> GetAll(int userId)
        {
            var repo = new BookmarksRepository(_connString);
            return repo.GetAllBookmarks(userId);
        }

        [Authorize]
        [HttpPost]
        [Route("delete")]
        public void Delete(int id)
        {
            var repo = new BookmarksRepository(_connString);
            repo.DeleteBookmark(id);
        }

        [Authorize]
        [HttpPost]
        [Route("update")]
        public void Update(Bookmark bookmark)
        {
            var repo = new BookmarksRepository(_connString);
            repo.UpdateBookmark(bookmark);
        }

        [Route("popular")]
        public List<PopularBookmark> GetPopularUrls()
        {
            var repo = new BookmarksRepository(_connString);
            List<string> urls = repo.GetAllBookmarkUrls();
            HashSet<string> uniqueUrls = urls.ToHashSet();

            return uniqueUrls
                .Select(b => new PopularBookmark
            {
                Url = b,
                Count = urls.Where(bookmark => bookmark == b).Count()
            }).OrderByDescending(b => b.Count)
                .Take(5)
                .ToList();
        }
    }
}
