class MusicLibrary {
    tracks = Track;
    artists = Artist;
    albums = Album;
    genres = Genre;
    playlists = Playlist;

    getTracks() {
        return this.tracks.library;
    }

    getTrackById(id) {
        return this.getTracks().filter(track => track.id === parseInt(id))[0];
    }

    getArtists() {
        return this.artists.library;
    }

    getAlbums() {
        return this.albums.library;
    }

    getAlbumTracksById(id) {
        return this.getTracks().filter(track => track.album.id === parseInt(id));
    }

    getGenres() {
        return this.genres.library;
    }
    
    getPlaylists() {
        return this.playlists.library;
    }

    getPlaylistTracksById(id) {
        return this.getPlaylists().filter(playlist => playlist.id === parseInt(id))[0].tracks;
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
    trackList;
    playing;
    playingWavform;
    audio = new Audio();
    audioContext = new AudioContext();
    shuffledTrackList = null;

    constructor(musicLibrary) {
        if (musicLibrary) {
            this.library = musicLibrary;
        } else {
            this.library = new MusicLibrary();
        }

        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener('resize', e => {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                new WavForm(this.audioContext, this.playing.file)
            }, 100)
        })
    }

    initialise() {
        this.trackList = this.library.getTracks();

        const audioTrack = this.audioContext.createMediaElementSource(this.audio);
        const initialTrack = this.trackList[0];

        audioTrack.connect(this.audioContext.destination);

        this.selectTrack(initialTrack);
        this.audio.load();
    }

    getFormattedTimeString(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    getNextTrack() {
        const currentTrackIndex = this.trackList.findIndex(track => track === this.playing);

        if (currentTrackIndex === this.trackList.length - 1) {
            return this.trackList[0];
        }

        return this.trackList[currentTrackIndex + 1];
    }

    getPrevTrack() {
        const currentTrackIndex = this.trackList.findIndex(track => track === this.playing);

        if (currentTrackIndex === 0) {
            return this.trackList[this.trackList.length - 1];
        }
        
        return this.trackList[currentTrackIndex - 1];
    }

    playTrackById(id) {
        const track = this.library.getTrackById(id);

        this.selectTrack(track);
        this.startTrack();
    }

    selectAllTracks() {
        this.trackList = this.library.getTracks();
    }

    selectAlbumById(id) {
        this.trackList = this.library.getAlbumTracksById(id);
    }

    selectPlaylistById(id) {
        this.trackList = this.library.getPlaylistTracksById(id);
    }

    selectTrack(track) {
        if (this.audio.src && !this.audio.paused) {
            this.audio.pause();
        }

        this.playing = track;
        
        this.audio.src = track.file;
        
        new WavForm(this.audioContext, this.playing.file);
    }

    shuffleTrackList() {
        this.shuffledTrackList = [...this.trackList];

        let currentTrackIndex = this.trackList.findIndex(track => track === this.playing);

        const temp = this.trackList[currentTrackIndex];
        
        for (let i = 1; i < this.trackList.length; i++) {
            const j = Math.floor(Math.random() * this.trackList.length);
            const temp = this.trackList[i];

            this.trackList[i] = this.trackList[j];
            this.trackList[j] = temp;
        }

        currentTrackIndex = this.trackList.findIndex(track => track === this.playing);
        
        this.trackList[currentTrackIndex] = this.trackList[0];
        this.trackList[0] = temp;
    }

    startTrack() {
        this.audio.play();
        this.audioContext.resume();
    }

    unshuffleTrackList() {
        this.trackList = this.shuffledTrackList;
        this.shuffledTrackList = null;
    }
}

class WavForm {
    audioContext;
    url;

    constructor(audioContext, trackUrl) {
        this.audioContext = audioContext;
        this.url = trackUrl;

        this.generate();
    }

    draw(normalizedData) {
        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        const padding = 24;

        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = (canvas.offsetHeight + padding * 2) * dpr;

        ctx.scale(dpr, dpr);
        ctx.translate(0, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas

        // draw the line segments
        const width = canvas.offsetWidth / normalizedData.length;
        for (let i = 0; i < normalizedData.length; i++) {
            const x = width * i;
            let height = normalizedData[i] * (canvas.offsetHeight - padding);

            this.drawLineSegment(ctx, x, height, width, (i + 1) % 2);
        }
    }

    drawLineSegment(ctx, x, y, width, isEven) {
        ctx.lineWidth = width;
        ctx.strokeStyle = "#1F2937";
        ctx.beginPath();
        
        if (!isEven) {
            ctx.moveTo(x, -y);
            ctx.lineTo(x, y);
        }
        
        ctx.stroke();
    }

    filterData(audioBuffer) {
        const rawData = audioBuffer.getChannelData(0);
        const samples = document.querySelector('canvas').getBoundingClientRect().width / 2;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];

        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i;
            let sum = 0;

            for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(rawData[blockStart + j])
            }

            filteredData.push(sum / blockSize);
        }

        return filteredData;
    }

    async generate() {
        const response = await fetch(this.url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

        const filteredData = this.filterData(audioBuffer);
        const normalizedData = this.normalizeData(filteredData);

        this.draw(normalizedData);
    }

    normalizeData(filteredData) {
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        return filteredData.map(n => n * multiplier);
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