//
//  treehacksApp.swift
//  treehacks
//
//  Created by Zeynep Tezduyar on 13/02/2021.
//

import SwiftUI
import UIKit
import Firebase

@main
struct treehacksApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions:
      [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    FirebaseApp.configure()
    return true
  }
}
