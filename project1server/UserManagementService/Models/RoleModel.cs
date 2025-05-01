using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace UserManagementService.Models
{
    [Table("role", Schema = "dbo")]
    public class RoleModel
    {
        [Key]
        [Required]
        [Column("id_role")]
        public int id_role { get; set; }
       
        [Column("name_role")]
        public string? name_role { get; set; }
        public string? description {  get; set; }
    }
}
