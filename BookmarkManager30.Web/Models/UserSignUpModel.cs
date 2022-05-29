using BookmarkManager30.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookmarkManager30.Web.Models
{
    public class UserSignUpModel : User
    {
        public string Password { get; set; }
    }
}
