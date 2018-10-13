package Logic;

public class ChatEntry {
    private final String text;
    private final Player player;
    private final long time;

    public ChatEntry(String text, Player player){
        this.text = text;
        this.player = player;
        this.time = System.currentTimeMillis();
    }

    public String getText(){ return this.text; }

    public Player getPlayer(){ return this.player; }

    public long getTime(){ return this.time; }

    @Override
    public String toString(){ return this.player.getName()+": "+this.text; }
}
