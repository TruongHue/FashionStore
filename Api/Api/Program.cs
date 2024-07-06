using Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//connection db
builder.Services.AddDbContext<DataContext>(
	options =>
	{
		options.UseMySql(builder.Configuration["ConnectionStrings:ConnectedDb"], ServerVersion.AutoDetect(builder.Configuration["ConnectionStrings:ConnectedDb"]));

	});


//Đăng ký dịch vụ lưu cache trong bộ nhớ
builder.Services.AddDistributedMemoryCache();

// Thêm dịch vụ session
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Thời gian timeout
    options.Cookie.HttpOnly = true; // Chỉ sử dụng HTTP cho cookie
    options.Cookie.IsEssential = true; // Đảm bảo cookie là bắt buộc
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

app.UseCors(options =>
options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseSession();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

/*app.UseStaticFiles(new StaticFileOptions
{
	FileProvider = new PhysicalFileProvider(
		Path.Combine(Directory.GetCurrentDirectory(), "Images")),
	RequestPath="/Images"
});*/

app.Run();
