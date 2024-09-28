using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagementService.Models
{
    [Table("role_permission", Schema = "dbo")]
    public class RolePermissionModel
    {
        [Key]
        [Required]
        public int id_role_permission { get; set; }
        public int? id_role { get; set; }
        public int? id_permission { get; set; }
        [ForeignKey("id_role")]
        public RoleModel? role { get; set; }
        [ForeignKey("id_permission")]
        public PermissionModel? permission { get; set; }

    }
}
