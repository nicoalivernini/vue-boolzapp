var app = new Vue ({

    el: '#root',
    data: {
      imgSrc: 'assets/img/avatar_',
      index: 0,
      newMessage: '',
      searchInput: '',
      classSearch: '',
      clickTendina: '',
      messageIndex: '',
      contacts: [
      	{
      		name: 'Michele',
      		avatar: '_1',
      		visible: true,
      		messages: [
      			{
      				date: '10/01/2020 15:30:55',
      				text: 'Hai portato a spasso il cane?',
      				status: 'sent'
      			},
      			{
      				date: '10/01/2020 15:50:00',
      				text: 'Ricordati di dargli da mangiare',
      				status: 'sent'
      			},
      			{
      				date: '10/01/2020 16:15:22',
      				text: 'Tutto fatto!',
      				status: 'received'
      			}
      		],
      	},
      	{
      		name: 'Fabio',
      		avatar: '_2',
      		visible: true,
      		messages: [
      			{
      				date: '20/03/2020 16:30:00',
      				text: 'Ciao come stai?',
      				status: 'sent'
      			},
      			{
      				date: '20/03/2020 16:30:55',
      				text: 'Bene grazie! Stasera ci vediamo?',
      				status: 'received'
      			},
      			{
      				date: '20/03/2020 16:35:00',
      				text: 'Mi piacerebbe ma devo andare a fare la spesa.',
      				status: 'sent'
      			}
      		],
      	},
      	{
      		name: 'Samuele',
      		avatar: '_3',
      		visible: true,
      		messages: [
      			{
      				date: '28/03/2020 10:10:40',
      				text: 'La Marianna va in campagna',
      				status: 'received'
      			},
      			{
      				date: '28/03/2020 10:20:10',
      				text: 'Sicuro di non aver sbagliato chat?',
      				status: 'sent'
      			},
      			{
      				date: '28/03/2020 16:15:22',
      				text: 'Ah scusa!',
      				status: 'received'
      			}
      		],
      	},
      	{
      		name: 'Luisa',
      		avatar: '_4',
      		visible: true,
      		messages: [
      			{
      				date: '10/01/2020 15:30:55',
      				text: 'Lo sai che ha aperto una nuova pizzeria?',
      				status: 'sent'
      			},
      			{
      				date: '10/01/2020 15:50:00',
      				text: 'Si, ma preferirei andare al cinema',
      				status: 'received'
      			}
      		],
      	},
      ]
    }, //Chiusura data

    created: function() {
      //Sistemo date e ore
      this.contacts.forEach((contact, i) => {
        contact.messages.forEach((message, k) => {
          let temp = message.date.split(' ')[0];
          let tempo = temp.split('/');
          let newDate = tempo[2] + '-' + tempo[1] + '-' + tempo[0] + ' ' + message.date.split(' ')[1];
          message.date = newDate;
        });
      });
    },


    methods: {

      //Inserimento orario messaggio
      getData: function (date) {
        let time = new Date(date);
        let ore = time.getHours();
        let minuti = time.getMinutes();
        return `${ore}:${minuti}`;
      },


      // Lista messaggi della chat
      insertMessage: function () {
        let today = new Date();
        let giorno = today.getDay();
        let mese = today.getMonth();
        let anno = today.getFullYear();
        let ora = today.getHours();
        let minuti = today.getMinutes();
        let secondi = today.getSeconds();
        //Stampo la data del messaggio
        let orario = `${giorno}/${mese}/${anno} ${ora}:${minuti}:${secondi}`;


        //Scrivo il nuovo messaggio
        const indexCurrent = this.index;

        if (this.newMessage != '') {
          var newMessage = {
            date: orario,
            text: this.newMessage,
            status: 'sent',
          };

          this.contacts[indexCurrent].messages.push(newMessage);
          this.newMessage = '';


          //Risposta automatica
          var timer = setTimeout(() => {
            var replyMessage = {
              date: orario,
              text: 'Va bene',
              status: 'received',
            }
            this.contacts[indexCurrent].messages.push(replyMessage);
          }, 1000);
        }
      },


      //Ultimo accesso
      lastAccessUtente: function (index) {
          const lastMessage = this.contacts[index].messages;
          const lastIndex = lastMessage.length - 1;

          return lastMessage[lastIndex].date;
      },


      //Ultimo messaggio
      lastMessage: function (index) {
        const lastMessage = this.contacts[index].messages;
        const lastIndex = lastMessage.length - 1;

        return lastMessage[lastIndex].text;
      },

      //Ultimo accesso chat
      lastAccess: function (date) {
        let data = new Date(date);
        let ora = data.getHours();
        let minuti = data.getMinutes();
        return `${ora}:${minuti}`;
      },


      //Apertura menù tendina
      openTendina: function(i) {
        this.messageIndex = i;

        this.clickTendina = 'true';
      },

      //Chiusura menù a tendina cliccando sul testo del messaggio
      closeTendina: function () {
        this.clickTendina = 'false';
      },

      //Cancellazione del messaggio
      deleteMessage: function (index) {
        this.contacts[this.index].messages.splice(index, 1)
      }


    }, //Chiusura methods

}); //Chiusura Vue
