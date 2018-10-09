package Logic;

import Logic.Player;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class PlayerManager {
    private final Set<Player> players;

    public PlayerManager() {this.players = new HashSet<>();}

    public synchronized void addPlayer(String name, String type){
        Player player = new Player(name, type);
        this.players.add(player);
    }

    public synchronized void removePlayer(Player player){
        this.players.remove(player);
    }

    public synchronized Set<Player> getPlayers(){return Collections.unmodifiableSet(this.players);}

    public boolean isPlayerExists(String name){
        for(Player player : this.players)
            if(player.getName().equals(name))
                return true;
        return false;
    }

    public Player getPlayer(String name){
        Player selectedPlayer = null;
        for(Player player : this.players)
            if(player.getName().equals(name))
                selectedPlayer = player;
        return selectedPlayer;
    }
}
