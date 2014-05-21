/**
 * Made by Justin654
 * Date: 5/21/2014
 * Pretty much finished except for Use limits and such.
 */


function On_PluginInt() {
    Plugin.CreateIni("kits");
}

function On_Command(Player, cmd, args) {
    var cooldown = 60;
    var time = Data.GetTableValue("kit_cooldown", Player.SteamID);
    var calc = System.Environment.TickCount - time;
    if (cmd == "clearkitcd") {
        if (Player.Admin) {
            ClearKitCooldown(Player);
        }
        else {
            Player.Message("Sorry only admins can use this command. :(")
        }
    }

    if (cmd == "kit") {
        if (args.Length == 0) {
            Player.Message("Kits avaible:");
            Player.Message("starter");
            Player.Message("admin");
            Player.Message("bow");
            Player.Message("build");
            Player.Message("Use /kit kitnamehere!");
        }
        if (calc >= cooldown * 60000) {

            if (args[0] == "starter") {
                StarterKit(Player);
                SetCooldown(Player);
            }
            if (args[0] == "admin") {
                AdminKit(Player);
            }
            if (args[0] == "bow") {
                BowKit(Player);
                SetCooldown(Player);
            }
            if (args[0] == "build") {
                BuildKit(Player);
                SetCooldown(Player);

            }

        }
        if (args[0] != "starter" && args[0] != "bow" && args[0] != "admin" && args[0] != "build") {
            Player.Message("You didn't choose a valid kit!");
        }
        else {
            return GetCooldown(Player);
        }

    }

}


function ClearKitCooldown(Player) {
    if (calc >= cooldown * 60000) {
        Player.Message("No need to clear cooldown, it's already 0");
    }
    else {
        Data.AddTableValue("kit_cooldown", Player.SteamID, 0);
        Player.Message("Cooldown set to 0, enjoy your kits!");
    }
}

function BowKit(Player) {
    Player.Inventory.AddItem("Hunting Bow", 1);
    Player.Inventory.AddItem("Arrow", 40);
    Player.Notice("☺", "You have spawned your bow kit!", 5);
    SetCooldown(Player);
}

function StarterKit(Player) {
    Player.Inventory.AddItemTo("Kevlar Helmet", 36, 1);
    Player.Inventory.AddItemTo("Kevlar Vest", 37, 1);
    Player.Inventory.AddItemTo("Kevlar Pants", 38, 1);
    Player.Inventory.AddItemTo("Kevlar Boots", 39, 1);
    Player.Inventory.AddItem("9mm Pistol", 1);
    Player.Inventory.AddItem("9mm Ammo", 39);
    Player.Inventory.AddItem("Cooked Chicken", 10);
    Player.Inventory.AddItem("Bandage", 5);
    Player.Notice("☺", "You have spawned your starter kit!", 5);
    SetCooldown(Player);
}

function AdminKit(Player) {
    if (Player.Admin) {
        Player.Inventory.AddItem("Uber Hunting Bow", 1);
        Player.Inventory.AddItem("Uber Hatchet", 1);
        Player.Inventory.AddItem("MP5A4", 1);
        Player.Inventory.AddItem("9mm Ammo", 400);
        Player.Inventory.AddItem("556 Ammo", 400);
        Player.Inventory.AddItem("M4", 1);
        Player.Inventory.AddItem("Shotgun", 1);
        Player.Inventory.AddItem("Bolt Action Rifle", 1);
        Player.Inventory.AddItem("P250", 1);
        //Player.Inventory.AddItemTo("Invisible Helmet", 36, 1);
        //Player.Inventory.AddItemTo("Invisible Vest", 37, 1);
        //Player.Inventory.AddItemTo("Invisible Pants", 38, 1);
        //Player.Inventory.AddItemTo("Invisible Boots", 39, 1);
        Player.Notice("☺", "You have spawned an admin kit!", 5);
    }

    else {
        Player.Message("Sorry, Only admins can get the admin kit");
    }
}

function SetCooldown(Player) {
    Data.AddTableValue("kit_cooldown", Player.SteamID, System.Environment.TickCount);
}

function GetCooldown(Player) {
    var cooldown = 60;
    var time = Data.GetTableValue("kit_cooldown", Player.SteamID);
    var calc = System.Environment.TickCount - time;
    var next = calc / 1000;
    var next2 = next / 60;
    var def = cooldown;
    var done = Number(next2).toFixed(2);
    var done2 = Number(def).toFixed(2);
    var done3 = (done2) - (done);
    var typeofamt = "";
    if (done3 < 1 && done3 >= 0) {
        if (done3 == 0.01) {

            typeofamt = "second";
        }
        else {

            typeofamt = "seconds";
        }
    }
    if (done3 > 1) {
        typeofamt = "minutes";
    }
    return Player.Notice("☹", "You'll be able to spawn another kit in " + Math.round(done3) + " " + typeofamt, 5);
}
