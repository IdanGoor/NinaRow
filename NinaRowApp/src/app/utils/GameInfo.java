package app.utils;

import Logic.GameDescriptor;
import Logic.Player;

import java.math.BigInteger;
import java.util.List;

public class GameInfo {
    final private String title;
    final private Player creator;
    final private int rows;
    final private BigInteger columns;
    final private BigInteger target;
    final private String variant;
    final private String status;
    final private int totalPlayers;
    final private List<Player> players;
    final private List<Player> visitors;
    final private boolean isEnded;
    final private List<Player> winners;
    private Player activePlayer = null;

    public GameInfo(GameDescriptor game) {
        this.title = game.getDynamicPlayers().getGameTitle();
        this.creator = game.getCreator();
        this.rows = game.getGame().getBoard().getRows();
        this.columns = game.getGame().getBoard().getColumns();
        this.target = game.getGame().getTarget();
        this.variant = game.getGame().getVariant();
        this.status = game.getStatus();
        this.totalPlayers = game.getDynamicPlayers().getTotalPlayers();
        this.players = game.getDynamicPlayers().getPlayers();
        this.visitors = game.getDynamicPlayers().getVisitors();
        if(!this.players.isEmpty())
            this.activePlayer = game.getDynamicPlayers().getActivePlayer();
        this.isEnded = game.isEnded();
        this.winners = game.getWinners();
    }
}
