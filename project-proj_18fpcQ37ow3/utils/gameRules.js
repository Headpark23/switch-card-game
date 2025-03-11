const gameRules = [
    {
        title: "Basic Setup",
        content: [
            "The game can be played with 2-6 players",
            "Each player receives 7 cards",
            "The dealer turns over the top card to start"
        ],
        icon: "fas fa-people-group"
    },
    {
        title: "Playing Cards",
        content: [
            "Players must match either the suit or number of the previous card, or play an A♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span>",
            "Multiple cards of the same number can be played at once (first card must match previous suit)",
            "An A♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span> can be played on any card except K♠/♣, 2♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span>, or 8♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span>",
            "Players can play any A♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span> to change the suit to one of their choice",
            "If you cannot play, pick up one card from the deck"
        ],
        icon: "fas fa-clone"
    },
    {
        title: "Power Cards Chain Reactions",
        content: [
            "Special cards (2♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span> and 8♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span>) can be defended against with the same card",
            "For 2♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span>, each card adds 2 to the total (up to 8 cards)",
            "For 8♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span>, the 'miss a turn' effect passes to the next player"
        ],
        icon: "fas fa-wand-sparkles"
    },
    {
        title: "Last Card Rule",
        content: [
            "Must announce 'Last Card' when you have one card remaining",
            "Failure to announce results in picking up 2 cards as penalty"
        ],
        icon: "fas fa-bullhorn"
    },
    {
        title: "Finishing Rules",
        content: [
            "Cannot finish on a 7♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span> (as it means play again)",
            "In 2-player games, cannot finish on a J♠/♣/<span class='text-red-600'>♥</span>/<span class='text-red-600'>♦</span> (reverses back to same player)",
            "First player to legally play their last card wins the game"
        ],
        icon: "fas fa-crown"
    }
];

const gamePlays = [
    {
        title: "One v One",
        content: [
            "First person to drop all their cards wins",
            "Simple head-to-head format"
        ],
        icon: "fas fa-user-friends"
    },
    {
        title: "Knock Out Play",
        content: [
            "Last player holding cards loses and drops out",
            "Other players continue until two players remain",
            "Perfect for tournament style play"
        ],
        icon: "fas fa-trophy"
    },
    {
        title: "Group Play",
        content: [
            "League format with 4 players play together for 4 games",
            "Scoring: 4,3,2,1 points for the order of last card play",
            "Scores accumulate after 4 games",
            "Top two advance to champions final",
            "Bottom 2 play for runners-up final"
        ],
        icon: "fas fa-users-cog"
    },
    {
        title: "One v One Darts Scoring",
        content: [
            "Players agree on number of sets to win (usually 3 or 5)",
            "Each player must win 3 legs to win 1 set",
            "First to agreed number of sets wins",
            "Must win by 2 clear legs if sets and legs are drawn"
        ],
        icon: "fas fa-bullseye"
    },
    {
        title: "Switch Cup",
        content: [
            "Put all players' names in a bowl for random draws",
            "Draw pairs for one v one matches",
            "Players can choose single game or best of 3",
            "Winners go back in bowl for next round draws",
            "If odd number of players, one random player gets bye to next round",
            "Continue until final two players compete for Switch Cup",
            "Perfect for large group tournaments"
        ],
        icon: "fas fa-trophy"
    }
];
