class MusicLibrary {
    tracks = Track;
    artists = Artist;
    albums = Album;
    genres = Genre;
    playlists = Playlist;

    getTracks() {
        return this.tracks.library;
    }

    getArtists() {
        return this.artists.library;
    }

    getAlbums() {
        return this.albums.library;
    }

    getGenres() {
        return this.genres.library;
    }
    
    getPlaylists() {
        return this.playlists.library;
    }

    sortByTrack(direction) {
        if (direction === 'asc') {
            return this.tracks.library.sort((a, b) => {
                if (a.name > b.name) return 1;
                else if (a.name < b.name) return -1;
                else return 0;
            });
        } else if (direction === 'desc') {
            return this.tracks.library.sort((a, b) => {
                if (a.name < b.name) return 1;
                else if (a.name > b.name) return -1;
                else return 0;
            }); 
        } else {
            return this.tracks.library;
        }
    }

    sortByArtist(direction) {
        if (direction === 'asc') {
            return this.tracks.library.sort((a, b) => {
                if (a.artist.name > b.artist.name) return 1;
                else if (a.artist.name < b.artist.name) return -1;
                else return 0;
            });
        } else if (direction === 'desc') {
            return this.tracks.library.sort((a, b) => {
                if (a.artist.name < b.artist.name) return 1;
                else if (a.artist.name > b.artist.name) return -1;
                else return 0;
            }); 
        } else {
            return this.tracks.library;
        }
    }

    sortByAlbum(direction) {
        if (direction === 'asc') {
            return this.tracks.library.sort((a, b) => {
                if (a.album.name > b.album.name) return 1;
                else if (a.album.name < b.album.name) return -1;
                else return 0;
            });
        } else if (direction === 'desc') {
            return this.tracks.library.sort((a, b) => {
                if (a.album.name < b.album.name) return 1;
                else if (a.album.name > b.album.name) return -1;
                else return 0;
            }); 
        } else {
            return this.tracks.library;
        }
    }

    sortByGenre(direction) {
        if (direction === 'asc') {
            return this.tracks.library.sort((a, b) => {
                if (a.genre.name > b.genre.name) return 1;
                else if (a.genre.name < b.genre.name) return -1;
                else return 0;
            });
        } else if (direction === 'desc') {
            return this.tracks.library.sort((a, b) => {
                if (a.genre.name < b.genre.name) return 1;
                else if (a.genre.name > b.genre.name) return -1;
                else return 0;
            }); 
        } else {
            return this.tracks.library;
        }
    }
}

class MusicPlayer {
    library;

    constructor(musicLibrary) {
        if (musicLibrary) {
            this.library = musicLibrary;
        } else {
            this.library = new MusicLibrary();
        }
    }
}

class Playlist {
    static count = 0;
    static library = [];

    id;
    name;
    tracks = [];

    constructor({ name, tracks }) {
        Playlist.count++;
        Playlist.library.push(this);

        this.id = Playlist.count;
        this.name = name;

        if (tracks instanceof Array) {
            this.tracks = tracks;
        } else if (tracks instanceof Track) {
            this.tracks.push(tracks);
        }
    }

    static add({ name, tracks }) {
        return new Playlist({ name, tracks });
    }
}

class Track {
    static count = 0;
    static library = [];

    id;
    name;
    artist;
    album;
    genre;
    year;
    path;
    artwork;
    number;

    constructor({ name, artist, album, genre, year, file, artwork, number }) {
        Track.count++;
        Track.library.push(this);

        this.id = Track.count;
        this.name = name;
        this.artist = Artist.set(artist);
        this.album = Album.set(album);
        this.genre = Genre.set(genre);
        this.year = year;
        this.file = file;
        this.artwork = artwork
        this.number = number;
    }

    static add({ name, artist, album, genre, year, file, artwork, number }) {
        return new Track({ name, artist, album, genre, year, file, artwork, number });
    }
}

class Artist {
    static count = 0;
    static library = [];
    
    id;
    name;

    constructor(name) {
        Artist.count++;
        Artist.library.push(this);

        this.id = Artist.count;
        this.name = name;
    }

    static add(name) {
        return new Artist(name)
    }

    static set(name) {
        const index = Artist.library.findIndex(artist => artist.name === name);
        const thisExists = index > -1;

        if (thisExists) {
            return Artist.library[index];
        } else {            
            return Artist.add(name);;
        }
    }
}

class Album {
    static count = 0;
    static library = [];
    
    id;
    name;

    constructor(name) {
        Album.count++;
        Album.library.push(this);

        this.id = Album.count;
        this.name = name;
    }

    static add(name) {
        return new Album(name);
    }

    static set(name) {
        const index = Album.library.findIndex(album => album.name === name);
        const thisExists = index > -1;

        if (thisExists) {
            return Album.library[index];
        } else {
            return Album.add(name);;
        }
    }
}

class Genre {
    static count = 0;
    static library = [];
    
    id;
    name;

    constructor(name) {
        Genre.count++;
        Genre.library.push(this);

        this.id = Genre.count;
        this.name = name;
    }

    static add(name) {
        return new Genre(name);
    }

    static set(name) {
        const index = Genre.library.findIndex(genre => genre.name === name);
        const thisExists = index > -1;

        if (thisExists) {
            return Genre.library[index];
        } else {
            return Genre.add(name);
        }
    }
}

export default MusicPlayer;