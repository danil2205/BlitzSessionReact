export const imagesMedals = {
  markOfMastery: {
    image: require("../images/medals/medalMastery.png"),
    description: "Ace Tanker / earn more xp in battle than 99% of players",
  },
  heroesOfRassenay: {
    image: require("../images/medals/heroesOfRassenay.png"),
    description: "Raseiniai Heroes Medal / 7 kills per battle",
  },
  medalLafayettePool: {
    image: require("../images/medals/medalLafayettePool.png"),
    description: "Pool's Medal / 6 kills per battle",
  },
  medalRadleyWalters: {
    image: require("../images/medals/medalRadleyWalters.png"),
    description: "Radley-Walters' Medal / 5 kills per battle",
  },
  medalKolobanov: {
    image: require("../images/medals/medalKolobanov.png"),
    description: "Kolobanov's Medal / win alone vs 3 enemies",
  },
  supporter: {
    image: require("../images/medals/supporter.png"),
    description: "Confederate / max support for allies",
  },
  warrior: {
    image: require("../images/medals/warrior.png"),
    description: "Top Gun / 4 kills per battle",
  },
  steelwall: {
    image: require("../images/medals/steelwall.png"),
    description: "Steel Wall / Recieve at last 11 hits.",
  },
};

const getPercentNum = (val) => ~~(val * 100) + '%';

export const statsToDisplay = (playerStats) => {
  return {
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
          title: "Maximum frags",
        },
        survived_win: {
          value: getPercentNum(playerStats.win_and_survived  / playerStats.battles),
          title: "Survived wins",
        },
        survived: {
          value: getPercentNum(playerStats.survived_battles / playerStats.battles),
          title: "Survived",
        },
      },

      column2: {
        accuracy: {
          value: getPercentNum(playerStats.hits / playerStats.shots),
          title: "Accuracy",
        },
        avg_kills: {
          value: (playerStats.frags / playerStats.battles).toFixed(2),
          title: "Kills avg",
        },
        avg_dmg_received: {
          value: ~~(playerStats.damage_received / playerStats.battles),
          title: "Dam. received avg",
        },
      },

      column3: {
        avg_capture: {
          value: (playerStats.capture_points / playerStats.battles).toFixed(2),
          title: "Capture avg",
        },
        avg_defense: {
          value: (playerStats.dropped_capture_points / playerStats.battles).toFixed(2),
          title: "Defense avg",
        },
        avg_spotted: {
          value: (playerStats.spotted / playerStats.battles).toFixed(2),
          title: "Spotted avg",
        },
      },

    },
  }
};
