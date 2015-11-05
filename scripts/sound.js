/***********************************************
					Howl Sounds
***********************************************/
/*musicBackground = new Howl(
{
	urls: ["sound/background.ogg"],
	loop: true,
	buffer: true,
	volume: 0.5
} );
musicBackground.play();*/

gibSound = new Howl(
{
	urls: ["sound/gibbed.wav"],
	buffer: true,
	volume: 0.2,
	onend: function() {
		isSfxPlaying = false;
	}
} );

uiClickSound = new Howl(
{
	urls: ["sound/click.wav"],
	buffer: true,
	volume: 0.1,
	onend: function() {
		isSfxPlaying = false;
	}
} );

powerupSound = new Howl(
{
	urls: ["sound/powerup.wav"],
	buffer: true,
	volume: 0.5,
	onend: function() {
		isSfxPlaying = false;
	}
} );

jumpSound = new Howl(
{
	urls: ["sound/jump.wav"],
	buffer: true,
	volume: 0.5,
	onend: function() {
		isSfxPlaying = false;
	}
} );