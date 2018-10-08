package Logic;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class GameManager {
    private final Set<GameDescriptor> games;

    public GameManager() {this.games = new HashSet<>();}

    public synchronized void addGame(Player creator, GameDescriptor game){
        game.setCreator(creator);
        this.games.add(game);
    }

    public synchronized void removeGame(GameDescriptor game){this.games.remove(game);}

    public synchronized Set<GameDescriptor> getGames(){return Collections.unmodifiableSet(this.games);}

    public boolean isGameExists(String title){
        for(GameDescriptor game : this.games)
            if(game.dynamicPlayers.gameTitle.equals(title))
                return true;
        return false;
    }

    public GameDescriptor getGame(String title){
        GameDescriptor selectedGame = null;
        for(GameDescriptor game : this.games)
            if(game.dynamicPlayers.gameTitle.equals(title))
                selectedGame = game;
        return selectedGame;
    }
}
