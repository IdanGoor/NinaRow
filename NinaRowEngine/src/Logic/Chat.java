package Logic;

import Logic.GameDescriptor;
import Logic.Player;

import java.util.*;

public class Chat {
    private final List<ChatEntry> entries = new ArrayList<>();

    public void init(){
        this.entries.clear();
    }

    public synchronized void addChatEntry(String text, Player player){
        this.entries.add(new ChatEntry(text, player));
    }

    public synchronized List<ChatEntry> getEntries(int fromIndex){
        if(fromIndex < 0 || fromIndex >= this.entries.size())
            fromIndex = 0;
        return this.entries.subList(fromIndex, this.entries.size());
    }

    public int getVersion(){ return this.entries.size(); }
}
