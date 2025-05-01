using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagementService.Models
{
    [Table("user", Schema = "dbo")]
    public class UserModel
    {
        [Key]
        [Required]
        public string id_user { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public DateTime? last_login { get; set; }
        public int? status { get; set; }
        public int? id_role { get; set; }
        [ForeignKey("id_role")]
        public RoleModel? role { get; set; }
    }
}
