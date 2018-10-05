package Logic;


public class Player {
    public enum Type {
        HUMAN("Human"), COMPUTER("Computer");

        private final String type;

        Type(final String type) {
            this.type = type;
        }

        @Override
        public String toString() {
            return type;
        }
    }

    private String name;
    private String type;
    protected int turnAmount = 0;

    public Player(String name, String type){
        this.name = name;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public int getTurnAmount(){
        return turnAmount;
    }

    public void init(){
        this.turnAmount = 0;
    }

    public boolean isHuman(){
        return this.type.equals(Type.HUMAN.toString());
    }

    public boolean isComputer(){
        return this.type.equals(Type.COMPUTER.toString());
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }

        if (obj == this){
            return true;
        }

        if (!(obj instanceof Player)) {
            return false;
        }

        final Player other = (Player) obj;
        return this.name.equals(other.name);
    }
}
