package app.servlets;

import Logic.GameManager;
import Logic.Player;
import Logic.PlayerManager;
import Logic.utils.GameSerializer;
import Logic.GameDescriptor;
import app.utils.ServletUtils;
import app.utils.SessionUtils;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

@WebServlet("/upload")
@MultipartConfig(fileSizeThreshold = 1024 * 1024, maxFileSize = 1024 * 1024 * 5, maxRequestSize = 1024 * 1024 * 5 * 5)
public class UploadGameServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        Collection<Part> parts = request.getParts();
        for (Part part : parts) {
            try{
                GameDescriptor game = GameSerializer.serializeStream(part.getInputStream());
                GameManager gameManager = ServletUtils.getGameManager(getServletContext());
                if(gameManager.isGameExists(game.getDynamicPlayers().getGameTitle())){
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    out.println("Game title is already exists");
                }
                else{
                    String usernameFromSession = SessionUtils.getUsername(request);
                    PlayerManager playerManager = ServletUtils.getPlayerManager(getServletContext());
                    Player creator = playerManager.getPlayer(usernameFromSession);
                    gameManager.addGame(creator, game);
                }
            } catch(Exception e){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.println(e.getMessage());
            }
        }
    }
}
