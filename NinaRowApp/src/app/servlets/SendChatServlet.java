package app.servlets;

import Logic.*;
import app.constants.Constants;
import app.utils.ServletUtils;
import app.utils.SessionUtils;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@WebServlet(name = "SendChatServlet", urlPatterns = {"/sendChat"})
public class SendChatServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        String usernameFromSession = SessionUtils.getUsername(request);
        if(usernameFromSession == null){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().println("Player is not logged in");
        }
        else{
            String gameTitleFromSession = SessionUtils.getGameTitle(request);
            if(gameTitleFromSession == null){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().println("Player didn't join any game");
            }
            else{
                String chatTextFromParameter = request.getParameter(Constants.CHAT_TEXT);
                if(chatTextFromParameter == null){
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().println("Chat text is illegal");
                }
                else if(chatTextFromParameter.isEmpty()){
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().println("Chat text cannot be empty");
                }
                else{
                    PlayerManager playerManager = ServletUtils.getPlayerManager(getServletContext());
                    GameManager gameManager = ServletUtils.getGameManager(getServletContext());
                    Player player = playerManager.getPlayer(usernameFromSession);
                    GameDescriptor game = gameManager.getGame(gameTitleFromSession);
                    if(game.isVisiting(player)){
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        response.getWriter().println("Visitor is not allowed to send messages to chat");
                    }
                    else{
                        synchronized (this){
                            game.getChat().addChatEntry(chatTextFromParameter, playerManager.getPlayer(usernameFromSession));
                        }
                        response.setStatus(HttpServletResponse.SC_OK);
                    }
                }
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    class ChatAndVersion {
        final private List<ChatEntry> entries;
        final private int version;

        public ChatAndVersion(List<ChatEntry> entries, int version){
            this.entries = entries;
            this.version = version;
        }
    }
}
