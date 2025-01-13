using EvaluacionFarmaciaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Añadir servicios al contenedor.
builder.Services.AddControllers();

// Agregar AutoMapper al contenedor de servicios
builder.Services.AddAutoMapper(typeof(Program));

// Configurar Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "EvaluacionFarmaciaAPI", Version = "v1" });
});

// Obtener la cadena de conexión desde appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Registrar el DbContext con la cadena de conexión
builder.Services.AddDbContext<FarmaciaDesarrolloWebContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "EvaluacionFarmaciaAPI v1");
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
