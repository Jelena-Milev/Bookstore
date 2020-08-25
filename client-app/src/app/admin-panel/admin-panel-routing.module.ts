import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminPanelPage } from "./admin-panel.page";

const routes: Routes = [
  {
    path: "tabs",
    component: AdminPanelPage,
    children: [
      {
        path: "publishers",
        loadChildren: () =>
          import("./publishers/publishers.module").then(
            (m) => m.PublishersPageModule
          ),
      },
      {
        path: "authors",
        loadChildren: () =>
          import("./authors/authors.module").then((m) => m.AuthorsPageModule),
      },

      {
        path: "genres",
        loadChildren: () =>
          import("./genres/genres.module").then((m) => m.GenresPageModule),
      },
      {
        path: "",
        redirectTo: "/admin-panel/tabs/publishers",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/admin-panel/tabs/publishers",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelPageRoutingModule {}
