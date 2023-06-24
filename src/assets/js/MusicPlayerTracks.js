import MusicPlayer from './MusicController';
import da from '../images/da.jpg';
import fdctl from '../images/fdctl.jpg';
import da01 from '../audio/da/01 Cries Of Hope.mp3';
import da02 from '../audio/da/02 Isle Of The Blessed.mp3';
import da03 from '../audio/da/03 Deus Ex Machina.mp3';
import da04 from '../audio/da/04 Divine Animosity Pt. I.mp3';
import da05 from '../audio/da/05 Divine Animosity Pt. II.mp3';
import da06 from '../audio/da/06 We Remember.mp3';
import da07 from '../audio/da/07 Resoluteness Overcome.mp3';
import da08 from '../audio/da/08 Risen From The Ashes.mp3';
import da09 from '../audio/da/09 Calm Before The Storm.mp3';
import da10 from '../audio/da/10 The Miracle.mp3';
import fdctl01 from '../audio/fdctl/01 Bayer.mp3';
import fdctl02 from '../audio/fdctl/02 Cyber City.mp3';
import fdctl03 from '../audio/fdctl/03 Chase.mp3';
import fdctl04 from '../audio/fdctl/04 Westworld.mp3';
import fdctl05 from '../audio/fdctl/05 The Return Of The Warrior.mp3';
import fdctl06 from '../audio/fdctl/06 New Beginnings.mp3';
import fdctl07 from '../audio/fdctl/07 Strength and Fortitude.mp3';
import fdctl08 from '../audio/fdctl/08 Starry Skies.mp3';
import fdctl09 from '../audio/fdctl/09 The Hero In Us All.mp3';
import fdctl10 from '../audio/fdctl/10 Escaping Cerberus.mp3';
import fdctl11 from '../audio/fdctl/11 Tribute To Valor.mp3';
import fdctl12 from '../audio/fdctl/12 The Warning.mp3';
import fdctl13 from '../audio/fdctl/13 Skybound.mp3';
import fdctl14 from '../audio/fdctl/14 War Of The Gods.mp3';
import fdctl15 from '../audio/fdctl/15 Solar Penumbra (From Light, Comes The Dark).mp3';
import fdctl16 from '../audio/fdctl/16 Cries Of Hope (Bonus).mp3';

const player = new MusicPlayer();

const track1 = player.library.tracks.add({ 
    name: 'Cries Of Hope', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da01, 
    artwork: da,
    number: 1
});

const track2 = player.library.tracks.add({ 
    name: 'Isle Of The Blessed', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da02, 
    artwork: da,
    number: 2
});

const track3 = player.library.tracks.add({ 
    name: 'Deus Ex Machina', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da03, 
    artwork: da,
    number: 3
});

const track4 = player.library.tracks.add({ 
    name: 'Divine Animosity Pt. I', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da04, 
    artwork: da,
    number: 4
});

const track5 = player.library.tracks.add({ 
    name: 'Divine Animosity Pt. II', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da05, 
    artwork: da,
    number: 5
});

const track6 = player.library.tracks.add({ 
    name: 'We Remember', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da06, 
    artwork: da,
    number: 6
});

const track7 = player.library.tracks.add({ 
    name: 'Resoluteness Overcome', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da07, 
    artwork: da,
    number: 7
});

const track8 = player.library.tracks.add({ 
    name: 'Risen From The Ashes', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da08, 
    artwork: da,
    number: 8
});

const track9 = player.library.tracks.add({ 
    name: 'Calm Before The Storm', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da09, 
    artwork: da,
    number: 9
});

const track10 = player.library.tracks.add({ 
    name: 'The Miracle', 
    artist: 'Aidan Lee', 
    album: 'Divine Animosity', 
    genre: 'Soundtrack', 
    year: '2020', 
    file: da10, 
    artwork: da,
    number: 10
});



const track11 = player.library.tracks.add({ 
    name: 'Bayer', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl01, 
    artwork: fdctl,
    number: 1
});

const track12 = player.library.tracks.add({ 
    name: 'Cyber City', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl02, 
    artwork: fdctl,
    number: 2
});

const track13 = player.library.tracks.add({ 
    name: 'Downtown Chase', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl03, 
    artwork: fdctl,
    number: 3
});

const track14 = player.library.tracks.add({ 
    name: 'Westworld', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl04, 
    artwork: fdctl,
    number: 4
});

const track15 = player.library.tracks.add({ 
    name: 'The Return Of The Warrior', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl05, 
    artwork: fdctl,
    number: 5
});

const track16 = player.library.tracks.add({ 
    name: 'New Beginnings', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl06, 
    artwork: fdctl,
    number: 6
});

const track17 = player.library.tracks.add({ 
    name: 'Strength and Fortitude', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl07, 
    artwork: fdctl,
    number: 7
});

const track18 = player.library.tracks.add({ 
    name: 'Starry Skies', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl08, 
    artwork: fdctl,
    number: 8
});

const track19 = player.library.tracks.add({ 
    name: 'The Hero In Us All', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl09, 
    artwork: fdctl,
    number: 9
});

const track20 = player.library.tracks.add({ 
    name: 'Escaping Cerberus', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl10, 
    artwork: fdctl,
    number: 10
});

const track21 = player.library.tracks.add({ 
    name: 'Tribute To Valor', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl11, 
    artwork: fdctl,
    number: 11
});

const track22 = player.library.tracks.add({ 
    name: 'The Warning', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl12, 
    artwork: fdctl,
    number: 12
});

const track23 = player.library.tracks.add({ 
    name: 'Skybound', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl13, 
    artwork: fdctl,
    number: 13
});

const track24 = player.library.tracks.add({ 
    name: 'War Of The Gods', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl14, 
    artwork: fdctl,
    number: 14
});

const track25 = player.library.tracks.add({ 
    name: 'Solar Penumbra (From Darkness Comes The Light)', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl15, 
    artwork: fdctl,
    number: 15
});

const track26 = player.library.tracks.add({ 
    name: 'Cries Of Hope (Bonus)', 
    artist: 'Aidan Lee', 
    album: 'From Darkness Comes The Light', 
    genre: 'Soundtrack', 
    year: '2021', 
    file: fdctl16, 
    artwork: fdctl,
    number: 16
});

const playlist1 = player.library.playlists.add({
    name: 'Top Picks',
    tracks: [track25, track21, track4, track13, track3, track12, track24, track2,  track1, track15]
})

const playlist2 = player.library.playlists.add({
    name: 'Uplifting',
    tracks: [track26, track21, track4, track19, track6, track16, track8, track13, track11]
})

const playlist3 = player.library.playlists.add({
    name: 'Hard Hitting',
    tracks: [track3, track12, track5, track25, track13, track20, track24]
})

const playlist4 = player.library.playlists.add({
    name: 'Emotional',
    tracks: [track4, track23, track1, track25, track16, track2, track9, track17, track21]
})

export default player;