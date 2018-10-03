package Logic;

import Logic.Player;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class PlayerManager {
    private final Set<Player> players;

    public PlayerManager() {this.players = new HashSet<>();}

    public synchronized void addPlayer(String name, String type){
        Player player = new Player();
        player.name = name;
        player.type = type;
        this.players.add(player);
    }

    public synchronized void removeUser(Player player){this.players.remove(player);}

    public synchronized Set<Player> getPlayers(){return Collections.unmodifiableSet(this.players);}

    public boolean isPlayerExists(String name){
        for(Player player : this.players)
            if(player.name.equals(name))
                return true;
        return false;
    }
}