//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.08.22 at 11:50:03 PM IDT 
//


package Logic;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


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
 *         &lt;element ref="{}Player" maxOccurs="unbounded"/>
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
@XmlRootElement(name = "Players")
public class Players {

    @XmlElement(name = "Player", required = true)
    protected List<Player> player;


    private int turnPlayerIndex = 0;

    /**
     * Gets the value of the player property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the player property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPlayer().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Player }
     * 
     * 
     */
    public List<Player> getPlayer() {
        if (player == null) {
            player = new ArrayList<>();
        }
        return this.player;
    }

    public void init(){
        this.turnPlayerIndex = 0;
        for(Player player : this.player)
            player.init();
    }

    public Player getActivePlayer(){
        return this.player.get(this.turnPlayerIndex);
    }

    protected void setNextPlayerAsActive(){
        this.turnPlayerIndex = (this.turnPlayerIndex+1+this.player.size())%this.player.size();
    }

    protected void setPreviousPlayerAsActive(){
        this.turnPlayerIndex = (this.turnPlayerIndex-1+this.player.size())%this.player.size();
    }

    protected void remove(Player player){
        if(this.player.contains(player)){
            if(player.equals(getActivePlayer()))
                setPreviousPlayerAsActive();
            if(this.player.indexOf(player)<=this.turnPlayerIndex)
                this.turnPlayerIndex--;

            this.player.remove(player);
        }
    }
}
