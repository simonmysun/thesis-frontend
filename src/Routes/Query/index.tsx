import { Calendar } from './../../Components';
import moment from 'moment';
import * as d3 from 'd3';
import './style.css';

const categories = ['Alarmsignal', 'AstmaHusten', 'Blending', 'Bohren', 'CovidHusten', 'Doseöffnen', 'Electronic_Zahnbürste', 'Etwas-am-Boden-ziehen', 'Fenster', 'Feuerzeug', 'Flöte', 'Fußstapfen-gehen', 'GesunderHusten', 'Gitarre', 'Glas', 'Haartrockner', 'Hahn', 'Handsäge', 'Huhn', 'Hund', 'Katze', 'Klarinette', 'Klassenname', 'klatschen', 'Klingelton', 'Küssen', 'Lachen', 'Mausklick', 'Metall-auf-Metall', 'Möbelrücken', 'Niesen', 'Pfeifen', 'Presslufthammer', 'Ruhe', 'Schlag', 'Schlagzeug', 'Schnarchen', 'Sirene', 'Sitar', 'SprechendeFrau', 'SprechenderMann', 'Staubsauger', 'Tastatur-tippen', 'Toilettenspülung', 'Trampler', 'Trinken', 'Türklingel', 'Türklopfen', 'Uhr-ticken', 'Vandalismus', 'Waschmaschine', 'Wasser', 'Weinen', 'Wimmern', 'Wind', 'Zahnbürste', 'Zerbrechen', 'ZwitscherndeVögel'];

function Query() {          // Initialize random data for the demo
  let now = moment().endOf('day').toDate()
  let time_ago = moment().startOf('day').subtract(10, 'year').toDate()
  let data = d3.timeDays(time_ago, now).map(function (dateElement, index) {
    return {
      date: dateElement,
      details: Array.apply(null, new Array(Math.floor(Math.random() * 15))).map(function (e, i, arr) {
        return {
          'name': categories[Math.ceil(Math.random() * categories.length)],
          'date': function () {
            let projectDate = new Date(dateElement.getTime())
            projectDate.setHours(Math.floor(Math.random() * 24))
            projectDate.setMinutes(Math.floor(Math.random() * 60))
            return projectDate
          }(),
          'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600) * Math.round(Math.random() * (index / 365)),
        }
      }),
      init: function () {
        this.total = this.details.reduce(function (prev, e) {
          return prev + e.value
        }, 0)
        return this
      },
      'total': 0,
    }.init()
  })

  return (
    <div>
      <span className="hidden">App Query</span>
      <Calendar currentData={data} startDate={new Date(new Date().getTime() - 364 * 24 * 60 * 60)} endDate={new Date()} />
    </div>
  );
}

export default Query;
