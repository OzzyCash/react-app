// /utils/bus.js
'use strict';
import Vue from 'vue';

function VueBus(Vue) {
  let bus = new Vue();

  Object.defineProperties(bus, {
    on: {
      get() {
        return this.$on.bind(this);
      }
    },
    once: {
      get() {
        return this.$once.bind(this);
      }
    },
    off: {
      get() {
        return this.$off.bind(this);
      }
    },
    emit: {
      get() {
        return this.$emit.bind(this);
      }
    }
  });

  Object.defineProperty(Vue, 'bus', {
    get() {
      return bus;
    }
  });

  Object.defineProperty(Vue.prototype, '$bus', {
    get() {
      return bus;
    }
  });
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueBus);
  }

  return bus;
}

export default VueBus;

/**
 * import { EventBus } from '@/libs/bus';
 *
 * EventBus.$bus.on('interceptors', () => {});
 * EventBus.$bus.emit('interceptors', 'value');
 */
const EventBus = new Vue();
export { EventBus };