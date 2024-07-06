using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Data
{

	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
			Database.EnsureCreated();
		}

		public DbSet<ChiTietHoaDonModel> ChiTietHoaDons { get; set; }

		public DbSet<GioHangModel> GioHangs { get; set; } 

		public DbSet<HoaDonModel> HoaDons { get; set; }

		public DbSet<DanhMucModel> DanhMucs { get; set; }

		public DbSet<ThuongHieuModel> ThuongHieus { get; set; }

		public DbSet<SanPhamModel> SanPhams{ get; set; }

		public DbSet<UserModel> Users { get; set; }
		
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
            base.OnModelCreating(modelBuilder);
		}
	}
}
