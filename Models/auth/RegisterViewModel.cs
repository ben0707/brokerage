using System.ComponentModel.DataAnnotations;

public class RegisterViewModel
{
    [Required(ErrorMessage = "Full Name is required")]
    [StringLength(100)]
    [RegularExpression(@"^[a-zA-Z]+(?: [a-zA-Z]+)*$",
        ErrorMessage = "Full Name should contain only letters and spaces.")]
    public string FullName { get; set; } = string.Empty;


    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address format")]
    [RegularExpression(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$",
        ErrorMessage = "Enter a valid email address.")]
    public string Email { get; set; } = string.Empty;


    [Required(ErrorMessage = "Password is required")]
    [DataType(DataType.Password)]
    [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$",
        ErrorMessage = "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character."
    )]
    public string Password { get; set; } = string.Empty;


    [Required(ErrorMessage = "Confirm Password is required")]
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; } = string.Empty;


    public bool AgreeToTerms { get; set; }
}





