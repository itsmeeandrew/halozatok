﻿using HajosTeszt.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    public class BoatController : Controller
    {
        [HttpGet]
        [Route("questions/all")]

        public ActionResult M1()
        {
            HajostesztContext context = new HajostesztContext();
            var kérdések = from x in context.Questions
                           select x;
            return new JsonResult(kérdések);
        }
    }
}
