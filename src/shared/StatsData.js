const getImage = (img) => require(`../images/medals/${img}.png`);

export const imagesMedals = {
  markOfMastery: {
    image: getImage('markOfMastery'),
    description: 'Ace Tanker / earn more xp in battle than 99% of players',
  },
  heroesOfRassenay: {
    image: getImage('heroesOfRassenay'),
    description: 'Raseiniai Heroes Medal / 7 kills per battle',
  },
  medalLafayettePool: {
    image: getImage('medalLafayettePool'),
    description: 'Pools Medal / 6 kills per battle',
  },
  medalRadleyWalters: {
    image: getImage('medalRadleyWalters'),
    description: 'Radley-Walters Medal / 5 kills per battle',
  },
  medalKolobanov: {
    image: getImage('medalKolobanov'),
    description: 'Kolobanovs Medal / win alone vs 3 enemies',
  },
  supporter: {
    image: getImage('supporter'),
    description: 'Confederate / max support for allies',
  },
  warrior: {
    image: getImage('warrior'),
    description: 'Top Gun / 4 kills per battle',
  },
  steelwall: {
    image: getImage('steelwall'),
    description: 'Steel Wall / Recieve at last 11 hits.',
  },
};

const getPercentNum = (val) => ~~(val * 100) + '%';

export const statsToDisplay = (playerStats) => ({
  main: {
    battles: playerStats.battles,
    victories: `${((playerStats.wins / playerStats.battles) * 100).toFixed(2)}%`,
    damage: ~~(playerStats.damage_dealt / playerStats.battles),
    avg_xp: ~~(playerStats.xp / playerStats.battles),
  },
  table: {
    column1: {
      max_frags: {
        value: playerStats.max_frags,
        title: 'Maximum frags',
      },
      survived_win: {
        value: getPercentNum(playerStats.win_and_survived  / playerStats.battles),
        title: 'Survived wins',
      },
      survived: {
        value: getPercentNum(playerStats.survived_battles / playerStats.battles),
        title: 'Survived',
      },
    },

    column2: {
      accuracy: {
        value: getPercentNum(playerStats.hits / playerStats.shots),
        title: 'Accuracy',
      },
      avg_kills: {
        value: (playerStats.frags / playerStats.battles).toFixed(2),
        title: 'Kills avg',
      },
      avg_dmg_received: {
        value: ~~(playerStats.damage_received / playerStats.battles),
        title: 'Dam. received avg',
      },
    },

    column3: {
      avg_capture: {
        value: (playerStats.capture_points / playerStats.battles).toFixed(2),
        title: 'Capture avg',
      },
      avg_defense: {
        value: (playerStats.dropped_capture_points / playerStats.battles).toFixed(2),
        title: 'Defense avg',
      },
      avg_spotted: {
        value: (playerStats.spotted / playerStats.battles).toFixed(2),
        title: 'Spotted avg',
      },
    },

  },
});
