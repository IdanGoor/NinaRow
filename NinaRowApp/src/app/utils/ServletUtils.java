package app.utils;

import Logic.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.util.List;

import static app.constants.Constants.INT_PARAMETER_ERROR;

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

    public static int getIntParameter(HttpServletRequest request, String name) {
        String value = request.getParameter(name);
        if (value != null) {
            try {
                return Integer.parseInt(value);
            } catch (NumberFormatException numberFormatException) {
            }
        }
        return INT_PARAMETER_ERROR;
    }
}
