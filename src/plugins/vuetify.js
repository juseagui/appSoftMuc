
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#009688',
        secondary: '#00897B',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        headerTable : '#F5F5F5',
        
        //Color Component chip
        chipColorPrimary: '#00796B',
        chipColorSecundary: '#004D40',

      },
    },
  },
  icons: {
    iconfont: 'md' || 'fa',
  },
});
