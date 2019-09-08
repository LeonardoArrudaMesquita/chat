using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Hubs
{
    // The Hub class manages connections, groups, and messaging.
    public class ChatHub : Hub
    {
        // Async para ter mais escablidade (Preparado pra crescer)
        public async Task EnviarMensagem(string usuario, string mensagem)
        {
            // await -> operador que suspende o metodo async até que que seja completada
            await Clients.All.SendAsync("ReceberMensagem", usuario, mensagem);
        }

    }
}
