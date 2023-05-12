var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var artists = new List<dynamic> { new { Name = "First Artist" }, new { Name = "Second Artist" } };
var albums = new List<dynamic>
{
    new { Artist = "First Artist", Name = "First Album", Genre = "First Genre" },
    new { Artist = "First Artist", Name = "Second Album", Genre = "Second Genre" },
    new { Artist = "Second Artist", Name = "Third Album", Genre = "First Genre" }
};
var genres = new List<dynamic> { new { Name = "First Genre" }, new { Name = "Second Genre" } };
var songs = new List<dynamic>
{
    new { Artist = "First Artist", Album = "First Album", Title = "First Song", Genre = "First Genre", Location = "./songs/first.mp3" },
    new { Artist = "First Artist", Album = "First Album", Title = "Second Song", Genre = "First Genre", Location = "./songs/second.mp3" },
    new { Artist = "First Artist", Album = "Second Album", Title = "Third Song", Genre = "Second Genre", Location = "./songs/third.mp3" },
    new { Artist = "Second Artist", Album = "Third Album", Title = "Fourth Song", Genre = "First Genre", Location = "./songs/fourth.mp3" }
};

app.MapGet("/api/artists", () => artists);
app.MapGet("/api/albums", (string artist, string genre) => albums.Where(e => (e.Artist == artist || artist == "all") && (e.Genre == genre || genre == "all")));
app.MapGet("/api/genres", () => genres);
app.MapGet("/api/songs", (string artist, string genre, string album) => songs.Where(e => (e.Artist == artist || artist == "all") && (e.Genre == genre || genre == "all") && (e.Album == album || album == "all")));
app.MapGet("/api/album-art", (string artist, string album) => Results.File(File.ReadAllBytes("./wwwroot/images/musical-note.svg"), "image/svg+xml"));
app.MapGet("/api/stream", (string location) => Results.File(File.ReadAllBytes(location)));

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
