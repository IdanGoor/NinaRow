package Logic.utils;

import Logic.GameDescriptor;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.*;

public class GameSerializer {
    public static GameDescriptor serializeXMLFile(String path) throws Exception{
        try {
            InputStream inputStream = new FileInputStream(path);
            return serializeStream(inputStream);
        } catch (FileNotFoundException e){
            throw new Exception("File not found");
        }
    }

    public static GameDescriptor serializeStream(InputStream inputStream) throws Exception{
        GameDescriptor gameDescriptor = null;
        try {
            JAXBContext jc = JAXBContext.newInstance("Logic");
            Unmarshaller u = jc.createUnmarshaller();
            gameDescriptor = (GameDescriptor) u.unmarshal(inputStream);
            gameDescriptor.init();
        } catch (JAXBException e) {
            e.printStackTrace();
            throw new Exception("Cant create an instance out of the XML file");
        }

        return gameDescriptor;
    }
}
