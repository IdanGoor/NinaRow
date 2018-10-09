package app.utils;

import app.constants.Constants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtils {
    private static String getSessionAttribute(HttpServletRequest request, String attributeName){
        HttpSession session = request.getSession(false);
        Object sessionAttribute = (session != null ? session.getAttribute(attributeName) : null);
        return sessionAttribute != null ? sessionAttribute.toString() : null;
    }

    public static String getUsername(HttpServletRequest request){
        return getSessionAttribute(request, Constants.PLAYER_NAME);
    }

    public static String getUserType(HttpServletRequest request){
        return getSessionAttribute(request, Constants.PLAYER_TYPE);
    }

    public static String getGameTitle(HttpServletRequest request){
        return getSessionAttribute(request, Constants.GAME_TITLE);
    }

    public static void clearSession(HttpServletRequest request){
        request.getSession().invalidate();
    }
}
