package app.servlets;

import Logic.Chat;
import Logic.ChatEntry;
import Logic.GameDescriptor;
import Logic.GameManager;
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


@WebServlet(name = "ChatServlet", urlPatterns = {"/chat"})
public class ChatServlet extends HttpServlet {

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
                int chatVersionFromParameter = ServletUtils.getIntParameter(request, Constants.CHAT_VERSION);
                if(chatVersionFromParameter == Constants.INT_PARAMETER_ERROR){
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().println("Illegal version of chat");
                }
                else{
                    GameManager gameManager = ServletUtils.getGameManager(getServletContext());
                    GameDescriptor game = gameManager.getGame(gameTitleFromSession);
                    Chat chat = game.getChat();
                    int chatVersion = 0;
                    List<ChatEntry> entries;
                    synchronized (this){
                        chatVersion = chat.getVersion();
                        entries = chat.getEntries(chatVersion);
                    }
                    try (PrintWriter out = response.getWriter()) {
                        Gson gson = new Gson();
                        String json = gson.toJson(new ChatAndVersion(entries, chatVersion));
                        out.println(json);
                        out.flush();
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
