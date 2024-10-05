using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagementService.Models
{
    [Table("permissions", Schema = "dbo")]
    public class PermissionModel
    {
        [Key]
        [Required]
        public int id_permission { get; set; }
        public string? permission_name { get; set; }
        public string? description { get; set; }
    }
}
