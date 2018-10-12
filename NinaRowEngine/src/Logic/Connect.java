package Logic;

import java.util.ArrayList;

public class Connect extends ArrayList<Disc> {
    private final Player player;

    public Connect(Player player){
        this.player = player;
    }

    public Player getPlayer(){
        return this.player;
    }

}
