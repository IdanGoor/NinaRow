package app.utils;

import Logic.PlayerManager;
import Logic.GameManager;
import javax.servlet.ServletContext;

public class ServletUtils {
    private static final String PLAYER_MANAGER_ATTRIBUTE_NAME = "playerManager";
    private static final String GAME_MANAGER_ATTRIBUTE_NAME = "gameManager";

    private static final Object playerManagerLock = new Object();
    private static final Object gameManagerLock = new Object();

    public static PlayerManager getPlayerManager(ServletContext servletContext){
        synchronized (playerManagerLock) {
            if (servletContext.getAttribute(PLAYER_MANAGER_ATTRIBUTE_NAME) == null) {
                servletContext.setAttribute(PLAYER_MANAGER_ATTRIBUTE_NAME, new PlayerManager());
            }
        }
        return (PlayerManager) servletContext.getAttribute(PLAYER_MANAGER_ATTRIBUTE_NAME);
    }

    public static GameManager getGameManager(ServletContext servletContext){
        synchronized (gameManagerLock) {
            if (servletContext.getAttribute(GAME_MANAGER_ATTRIBUTE_NAME) == null) {
                servletContext.setAttribute(GAME_MANAGER_ATTRIBUTE_NAME, new GameManager());
            }
        }
        return (GameManager) servletContext.getAttribute(GAME_MANAGER_ATTRIBUTE_NAME);
    }

}
