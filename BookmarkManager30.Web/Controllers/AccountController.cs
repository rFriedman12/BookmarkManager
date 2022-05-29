using BookmarkManager30.Data;
using BookmarkManager30.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BookmarkManager30.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
   {
        private string _connString;

        public AccountController(IConfiguration config)
        {
            _connString = config.GetConnectionString("ConStr");
        }

        [Route("getcurrentuser")]
        [HttpGet]
        public User GetCurrentUser()
        {
            var repo = new BookmarksRepository(_connString);
            if (User.Identity.IsAuthenticated)
            {
                return repo.GetUser(User.Identity.Name);
            }
            return null;
        }

        [Route("signup")]
        [HttpPost]
        public void SignUp(UserSignUpModel user)
        {
            var repo = new BookmarksRepository(_connString);
            repo.AddUser(user, user.Password);
        }

        [Route("login")]
        [HttpPost]
        public User LogIn(UserLogInModel logInUser)
        {
            var repo = new BookmarksRepository(_connString);
            User user = repo.LogIn(logInUser.Email, logInUser.Password);
            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>()
            {
                new Claim("user", user.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();

            return user;
        }

        [Route("logout")]
        public void LogOut()
        {
            HttpContext.SignOutAsync().Wait();
        }
    }
}
