//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.08.22 at 11:50:03 PM IDT 
//


package Logic;


import javafx.concurrent.Task;

import javax.swing.text.TabableView;
import javax.xml.bind.annotation.*;
import java.util.*;

/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="GameType">
 *           &lt;simpleType>
 *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *               &lt;enumeration value="Basic"/>
 *               &lt;enumeration value="MultiPlayer"/>
 *               &lt;enumeration value="DynamicMultiPlayer"/>
 *             &lt;/restriction>
 *           &lt;/simpleType>
 *         &lt;/element>
 *         &lt;element ref="{}Game"/>
 *         &lt;element ref="{}Players" minOccurs="0"/>
 *         &lt;element ref="{}DynamicPlayers" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
})
@XmlRootElement(name = "GameDescriptor")
public class GameDescriptor {
    public enum Status {
        ACTIVE, INACTIVE
    }
    private static final int ROW_MIN = 5;
    private static final int ROW_MAX = 50;
    private static final int COL_MIN = 6;
    private static final int COL_MAX = 30;
    private static final int TARGET_MIN = 2;
    private static final int PLAYERS_MIN = 2;
    private static final int PLAYERS_MAX = 6;

    @XmlElement(name = "GameType", required = true)
    protected String gameType;
    @XmlElement(name = "Game", required = true)
    protected Game game;
    @XmlElement(name = "Players")
    protected Players players;
    @XmlElement(name = "DynamicPlayers")
    protected DynamicPlayers dynamicPlayers;

    private History history = new History();
    private int turnAmount = 0;
    private Random random = new Random();
    private Status status = Status.INACTIVE;
    private boolean isEnded = false;

    @XmlTransient
    private IUIupdater UIupdater;

    /**
     * Gets the value of the gameType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGameType() {
        return gameType;
    }

    /**
     * Sets the value of the gameType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGameType(String value) {
        this.gameType = value;
    }

    /**
     * Gets the value of the game property.
     * 
     * @return
     *     possible object is
     *     {@link Game }
     *     
     */
    public Game getGame() {
        return game;
    }

    /**
     * Sets the value of the game property.
     * 
     * @param value
     *     allowed object is
     *     {@link Game }
     *     
     */
    public void setGame(Game value) {
        this.game = value;
    }

    /**
     * Gets the value of the players property.
     * 
     * @return
     *     possible object is
     *     {@link Players }
     *     
     */
    public Players getPlayers() {
        return players;
    }

    /**
     * Sets the value of the players property.
     * 
     * @param value
     *     allowed object is
     *     {@link Players }
     *     
     */
    public void setPlayers(Players value) {
        this.players = value;
    }

    /**
     * Gets the value of the dynamicPlayers property.
     * 
     * @return
     *     possible object is
     *     {@link DynamicPlayers }
     *     
     */
    public DynamicPlayers getDynamicPlayers() {
        return dynamicPlayers;
    }

    /**
     * Sets the value of the dynamicPlayers property.
     * 
     * @param value
     *     allowed object is
     *     {@link DynamicPlayers }
     *     
     */
    public void setDynamicPlayers(DynamicPlayers value) {
        this.dynamicPlayers = value;
    }

    public int getTurnAmount(){
        return this.turnAmount;
    }

    public List<Move> getHistoryMoves(){
        return this.history.getMoves();
    }

    public void setUIupdater(IUIupdater updater){ this.UIupdater = updater; }

    public boolean isActive(){
        return this.status == Status.ACTIVE;
    }

    public boolean isEnded(){ return this.isEnded; }

    public void init() throws Exception{
        Game game = this.game;
        Board board  = game.board;
        if(board.getRows() < ROW_MIN || board.getRows() > ROW_MAX)
            throw new Exception("Size of rows in board must be between "+ROW_MIN+" and "+ROW_MAX);

        if(board.columns.intValue() < COL_MIN || board.columns.intValue() > COL_MAX)
            throw new Exception("Size of columns in board must be between "+COL_MIN+" and "+COL_MAX);

        if(game.target.intValue() < TARGET_MIN || game.target.intValue() >= board.rows || game.target.intValue() >= board.columns.intValue())
            throw new Exception("Target value must be smaller than columns size and rows size and at least "+TARGET_MIN);

        if(this.players.player.size() < PLAYERS_MIN || this.players.player.size() > PLAYERS_MAX)
            throw new Exception("The number of players should be between "+PLAYERS_MIN+" and "+PLAYERS_MAX);

        Map<Short, Player> ids = new HashMap<>();
        for(Player player : this.players.player){
            if(ids.containsKey(player.id))
                throw new Exception("Every player should have its own unique key");
            ids.put(player.id, player);
        }
    }

    public void executePlayerMove(int col, BoardOperation operation){
        Player activePlayer = this.players.getActivePlayer();
        if(operation.isAllowed(activePlayer, col)){
            operation.execute(activePlayer, col);
            activePlayer.turnAmount++;
            this.turnAmount++;
            this.history.addMove(new Move(this.turnAmount, activePlayer, operation.toString(), col));
            swapPlayers();
        }
    }

    public void play(){
        Player activePlayer = this.players.getActivePlayer();

        if (activePlayer.isComputer() && !this.isEnded){
            SleeperTask sleeper = new SleeperTask();
            sleeper.setOnSucceeded(event ->
            {
                if(!this.isEnded){
                    if(this.game.board.isFull() && this.game.isPopoutMode() && this.game.board.popOut.hasOption(activePlayer)){
                        int column = this.game.board.popOut.getRandomOption(activePlayer);
                        executePlayerMove(column, this.game.board.popOut);
                    }
                    else if(!this.game.board.isFull()){
                        int column = this.game.board.pushIn.getRandomOption(activePlayer);
                        executePlayerMove(column, this.game.board.pushIn);
                    }

                    this.UIupdater.updateUI();
                }
            });

            Thread computerPlay = new Thread(sleeper);
            computerPlay.start();
        }
    }

    public void swapPlayers(){
        this.players.setNextPlayerAsActive();
        Player activePlayer = this.players.getActivePlayer();

        if(this.game.board.isConnectExists()
                || (this.game.isPopoutMode() && this.game.board.isFull() && !this.game.board.popOut.hasOption(activePlayer))
                || (!this.game.isPopoutMode() && this.game.board.isFull())
                || (this.players.player.size() == 1))
            endGame();
        else
            this.play();
    }

    public void removePlayer(Player player){
        boolean wasActive = player.equals(this.players.getActivePlayer());
        if(this.players.player.contains(player)){
            this.players.remove(player);
            this.game.board.removeAllPlayerDiscs(player);
            this.game.board.checkConnectFullBoard();
            if(wasActive)
                swapPlayers();
        }
    }

    public void startGame(){
        this.turnAmount = 0;
        this.players.init();
        this.history.init();
        this.game.init();
        this.isEnded = false;
        this.status = Status.ACTIVE;

        play();
    }

    public void endGame(){
        this.isEnded = true;
        this.status = Status.INACTIVE;
    }

    public List<Player> getWinners(){
        List<Player> winners = new ArrayList<>();
        if(this.isEnded){
            if(this.players.player.size() == 1)
                winners.add(this.players.player.get(0));
            else{
                for(Connect connect : this.game.board.getConnects()){
                    if(!winners.contains(connect.getPlayer()))
                        winners.add(connect.getPlayer());
                }
            }
        }

        return winners;
    }

}
