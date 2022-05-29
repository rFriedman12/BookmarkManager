using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookmarkManager30.Data
{
    public class BookmarksRepository
    {
        private string _connString;

        public BookmarksRepository(string connString)
        {
            _connString = connString;
        }

        public void AddUser(User user, string password)
        {
            var context = new BookmarksDataContext(_connString);            
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User LogIn(string email, string password)
        {
            User user = GetUser(email);
            if (user == null)
            {
                return null;
            }

            if (BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return user;
            }
            return null;
        }

        public User GetUser(string email)
        {
            var context = new BookmarksDataContext(_connString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

        public void AddBookmark(Bookmark bookmark)
        {
            var context = new BookmarksDataContext(_connString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public List<Bookmark> GetAllBookmarks(int userId)
        {
            var context = new BookmarksDataContext(_connString);
            return context.Bookmarks.Where(b => b.UserId == userId).ToList();
        }

        public void DeleteBookmark(int id)
        {
            var context = new BookmarksDataContext(_connString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {id}");
        }

        public void UpdateBookmark(Bookmark bookmark)
        {
            var context = new BookmarksDataContext(_connString);
            context.Bookmarks.Update(bookmark);
            context.SaveChanges();
        }

        public List<string> GetAllBookmarkUrls()
        {
            var context = new BookmarksDataContext(_connString);
            return context.Bookmarks.Select(b => b.Url).ToList();
        }
    }
}
