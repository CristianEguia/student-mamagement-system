namespace API.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using API.Data;



    public class RegisterModel
    {
        public string Email {get; set; }
        public string Password {get; set;}
        public string UserName { get; set; } //Agregado para Registro de usuario y mostralo en el sidebar
    }

    public class LoginModel {
        public string Email {get; set; }
        public string Password {get; set;}
    }

    [Route("api/[controller]")] // /auth
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;

        // Constructor
        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("register")] // /auth/register
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var user = new IdentityUser { UserName = model.UserName, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "User");
                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

            if(result.Succeeded){
                var user = await _userManager.FindByEmailAsync(model.Email);
                var roles = await _userManager.GetRolesAsync(user);
                var token = GenerateJwtToken(user, roles);
                return Ok (new { token, username = user.UserName }); //Guarda el user en username y lo devuelve en el iniciop de sesion.
            }

            return Unauthorized();
        }


        // --

        private string GenerateJwtToken(IdentityUser user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpireMinutes"]));

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}