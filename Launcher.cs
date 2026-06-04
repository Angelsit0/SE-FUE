using System;
using System.Diagnostics;
using System.IO;

namespace SE_FUE_Launcher
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                // Obtener ruta del index.html en la carpeta actual
                string currentDir = AppDomain.CurrentDomain.BaseDirectory;
                string indexPath = Path.Combine(currentDir, "index.html");
                
                if (!File.Exists(indexPath))
                {
                    // Fallback para buscar si lo corren desde otro lado
                    indexPath = Path.Combine(Directory.GetCurrentDirectory(), "index.html");
                }

                if (!File.Exists(indexPath))
                {
                    Console.WriteLine("No se encontró index.html en la carpeta del ejecutable.");
                    return;
                }

                // Usar URI local
                string url = "file:///" + indexPath.Replace("\\", "/");

                // Configurar el proceso para lanzar Edge en "Modo Aplicación" (sin barras de URL)
                ProcessStartInfo psi = new ProcessStartInfo();
                psi.FileName = "msedge.exe"; // Windows 10/11 default browser
                string tempProfile = Path.Combine(Path.GetTempPath(), "SE_FUE_Profile");
                psi.Arguments = string.Format("--user-data-dir=\"{0}\" --allow-file-access-from-files --app=\"{1}\" --window-size=1280,720", tempProfile, url);
                psi.UseShellExecute = true;

                try
                {
                    Process.Start(psi);
                }
                catch (Exception)
                {
                    // Si Edge no está, intentar Chrome
                    try
                    {
                        psi.FileName = "chrome.exe";
                        Process.Start(psi);
                    }
                    catch (Exception)
                    {
                        // Si no, lanzar en navegador predeterminado
                        Process.Start(url);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al lanzar el juego: " + ex.Message);
            }
        }
    }
}
