import { Component, Vue } from "vue-property-decorator";
import TabsetsListComponent from "@/containers/TabsetsListComponent/TabsetsListComponent"; // @ is an alias to /src

@Component({
  components: {
    TabsetsListComponent
  }
})
export default class Home extends Vue {}
