using Microsoft.EntityFrameworkCore;
using System;

namespace BookmarkManager30.Data
{
    public class BookmarksDataContext : DbContext
    {
        private string _connString;

        public BookmarksDataContext(string connString)
        {
            _connString = connString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}
