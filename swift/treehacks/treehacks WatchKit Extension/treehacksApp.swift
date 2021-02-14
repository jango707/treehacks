//
//  treehacksApp.swift
//  treehacks WatchKit Extension
//
//  Created by Zeynep Tezduyar on 13/02/2021.
//

import SwiftUI

@main
struct treehacksApp: App {
    @SceneBuilder var body: some Scene {
        WindowGroup {
            NavigationView {
                ContentView(model: FlashCardModel())
            }
        }

        WKNotificationScene(controller: NotificationController.self, category: "myCategory")
    }
}
